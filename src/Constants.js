import POSITIVE_WORDS from "./positive-words";
import NEGATIVE_WORDS from "./negative-words";

export const GOOD_WORDS = new Set(POSITIVE_WORDS);

export const BAD_WORDS = new Set(NEGATIVE_WORDS);

export const BASE_SCORE = 127;

export const MAX_SCORE = 255;

export const MIN_SCORE = 0;

export const CONVERSATION_LENGTH = 10;

export const MULTIPLIER = 20;

const GAME_OVER_TEXT = [
  "I think I might really like you.",
  "You're nice.",
  "I don't feel much after all.",
  "I don't want to talk to you anymore.",
  "You hurt me."
];

export const getGameOverText = score => {
  const effectiveScore = score > MIN_SCORE && score < MAX_SCORE ? score : score <= MIN_SCORE ? MIN_SCORE : MAX_SCORE;
  if (effectiveScore === MIN_SCORE) {
    return GAME_OVER_TEXT[4];
  } else if (effectiveScore === MAX_SCORE) {
    return GAME_OVER_TEXT[0];
  }
  return GAME_OVER_TEXT[2];
};
