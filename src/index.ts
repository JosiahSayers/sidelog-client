import axios, { AxiosError } from 'axios';

export interface SidelogConfig {
  sidelogUrl: string;
  clientId: string;
  logToConsole?: boolean;
  logToApi?: boolean;
}

export type SidelogLogLevel = typeof LOG_LEVELS[number];

type IndividualLogMethods = Record<SidelogLogLevel, (message: string, meta?: any) => ReturnType<typeof log>>;

const LOG_LEVELS = ['debug', 'info', 'warn', 'error', 'trace'] as const;

let config: SidelogConfig;
let defaultMeta: Record<string, unknown> = {};
let hasBeenNotifiedThatConfigIsNotSet = false;

const log = async (message: string, level: SidelogLogLevel, meta?: Record<string, unknown>) => {
  if ((!config || !config.sidelogUrl || !config.clientId) && !hasBeenNotifiedThatConfigIsNotSet) {
    console.warn('Sidelog - Skipping sending logs to sidelog, config not set');
    hasBeenNotifiedThatConfigIsNotSet = true;
  }

  const json = {
    ...meta,
    ...defaultMeta,
  };
  
  if (config.logToConsole) {
    console[level](message, json);
  }

  if (config.logToApi) {
    try {
      await axios({
        url: `${config.sidelogUrl}/logs`,
        headers: {
          'content-type': 'application/json',
          'clientId': config.clientId
        },
        method: 'post',
        data: {
          message,
          level,
          json
        },
      });

      return { success: true };
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        console.error('Sidelog Error', e.response.data);
      } else if (e instanceof AxiosError) {
        console.error('Sidelog Error', e.toJSON());
      } else {
        console.error('Sidelog Error', e);
      }

      return { success: false };
    }
  }
}

const individualLogMethods = LOG_LEVELS.reduce((acc, level) => {
  return {
    ...acc,
    [level]: (message: string, meta: any) => log(message, level, meta),
  }
}, {}) as IndividualLogMethods;

const setConfig = ({ sidelogUrl, clientId, logToConsole = false, logToApi = true }: SidelogConfig) => {
  if (!sidelogUrl) {
    throw new Error('sidelogUrl is required');
  }

  if (!clientId) {
    throw new Error('clientId is required');
  }

  config = { sidelogUrl, clientId, logToConsole, logToApi };
};

const updateDefaultMeta = (callback: (currentMeta: Record<string, unknown>) => Record<string, unknown>) => {
  defaultMeta = callback(defaultMeta);
}


export default {
  log,
  ...individualLogMethods,
  setConfig,
  updateDefaultMeta,
};
