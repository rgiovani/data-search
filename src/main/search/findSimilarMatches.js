import stringSimilarity from 'string-similarity';
import { isArray } from '../../utils/shared/functions/validateTypes.js';

//**Fraction between 0 and 1. \'range\' is 0.85 by default */
export const rating = {
    _rangeUp: 0.85,
    _rangeDown: 0.30,
    get rangeUp() {
        return this._rangeUp;
    },
    set rangeUp(rangeUp) {
        this._rangeUp = rangeUp;
    },
    get rangeDown() {
        return this._rangeDown;
    },
    set rangeDown(rangeDown) {
        this._rangeDown = rangeDown;
    }
}

export function findSimilarMatches(input, tags) {
    if (isArray(input) && isArray(tags)) {
        const getSimilar = [];
        input.forEach(word => {
            const matches = stringSimilarity.findBestMatch(word, tags);
            for (const i in matches.ratings) {
                if (matches.ratings[i].rating > rating.rangeUp) {
                    getSimilar.push(matches.ratings[i].target);
                } else if (matches.ratings[i].rating > (rating.rangeUp - rating.rangeDown)) {
                    getSimilar.push(matches.ratings[i].target);
                }
            }
        });
        return getSimilar;
    }
}