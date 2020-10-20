import stringSimilarity from 'string-similarity';
import IsNotNumberError from '../../utils/shared/errors/IsNotNumber.error.js';
import { isArray } from '../../utils/shared/functions/validateTypes.js';

const distance = {
    _min: 0.30,
    _max: 0.85,
    get min() {
        return this._min;
    },
    get max() {
        return this._max;
    }
}

export function getMaxMinDistance() {
    return { min: distance.min, max: distance.max };
}

export function setMaxMinDistance(min, max) {
    try {
        if (!min & !max) {
            throw new Error('\'min\'or \'max\' cannot be undefined or null')
        }
        if (typeof min != 'number' || typeof max != 'number') {
            throw new IsNotNumberError('min or max');
        }

        const calc = max - min;
        if (calc < 0) {
            throw new Error('\'min\' cannot be greater than \'max\'')
        }
        if (min < 0 || max < 0) {
            throw new Error('\'min\'or \'max\' cannot be less than 0')
        } else {
            if (calc >= 0 && calc <= 1) {
                distance._min = min;
                distance._max = max;
            } else {
                throw new Error('\'min\' or \'max\' does not appear to be a fraction between 0 and 1.')
            }
        }
    } catch (e) {
        if (e.type) {
            console.error(`\n[${e.type}] - ${e.description}`);
        } else {
            console.error(`[RuntimeError] - ${e.message}`);
        }
    }
}

export function resetMaxMin() {
    distance._min = 0.30;
    distance._max = 0.85;
}

export function findSimilarMatches(input, tags) {
    if (isArray(input) && isArray(tags)) {
        const getSimilar = [];
        input.forEach(word => {
            const matches = stringSimilarity.findBestMatch(word, tags);
            for (const i in matches.ratings) {
                if (matches.ratings[i].rating > distance.max) {
                    getSimilar.push(matches.ratings[i].target);
                } else if (matches.ratings[i].rating > (distance.max - distance.min)) {
                    getSimilar.push(matches.ratings[i].target);
                }
            }
        });
        return getSimilar;
    }
}