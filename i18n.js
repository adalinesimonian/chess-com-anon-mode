export const messages = {
  en: {
    turnAnonOn: 'Turn anon mode on',
    turnAnonOff: 'Turn anon mode off',
  },
  'nb-NO': {
    turnAnonOn: 'Slå på anonym modus',
    turnAnonOff: 'Slå av anonym modus',
  },
  'nn-NO': {
    turnAnonOn: 'Slå på anonym modus',
    turnAnonOff: 'Slå av anonym modus',
  },
  ru: {
    turnAnonOn: 'Включить анонимный режим',
    turnAnonOff: 'Выключить анонимный режим',
  },
};

const languageAliases = {
  'en-US': 'en',
  'en-GB': 'en',
  'en-CA': 'en',
  'en-AU': 'en',
  nb: 'nb-NO',
  nn: 'nn-NO',
  no: 'nn-NO',
  'ru-MD': 'ru',
  'ru-RU': 'ru',
};

/**
 * @param {keyof messages.en} key
 */
export function getMessage(key) {
  return (
    messages[navigator.language]?.[key] ??
    messages[languageAliases[navigator.language]]?.[key] ??
    messages.en[key]
  );
}
