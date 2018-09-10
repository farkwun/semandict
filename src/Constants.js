import POSITIVE_WORDS from "./positive-words";
import NEGATIVE_WORDS from "./negative-words";

export const GOOD_WORDS = new Set(POSITIVE_WORDS);

export const BAD_WORDS = new Set(NEGATIVE_WORDS);

export const BASE_SCORE = 127;

export const MAX_SCORE = 255;

export const MIN_SCORE = 0;

export const CONVERSATION_LENGTH = 10;

export const MULTIPLIER = 10;

export const HINT_THRESHOLD = 5;

const GAME_OVER_TEXT = [
  "You like hurting me.",
  "I don't want to talk to you anymore.",
  "That wasn't very friendly.",
  "I don't feel much after all.",
  "You're nice.",
  "Thanks for talking to me.",
  "I think I might really like you."
];

export const getGameOverText = score => {
  const effectiveScore = score > MIN_SCORE && score < MAX_SCORE ? score : score <= MIN_SCORE ? MIN_SCORE : MAX_SCORE;
  const scorePartition = MAX_SCORE / GAME_OVER_TEXT.length;
  if (effectiveScore === MIN_SCORE) {
    return GAME_OVER_TEXT[GAME_OVER_TEXT.length - 1];
  } else if (effectiveScore === MAX_SCORE) {
    return GAME_OVER_TEXT[0];
  }
  return GAME_OVER_TEXT[Math.floor(effectiveScore / scorePartition)];
};
