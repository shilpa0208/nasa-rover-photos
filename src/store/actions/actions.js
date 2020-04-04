import * as ActionTypes from './actionTypes'
import api from '../../api'
import ls from 'localstorage-ttl'


/**
 * Implemented basic TTL caching strategy using localstorage-ttl third party library. Currently I've set 
 * cache time to 15 mins, but if we know these photos are pretty stable then this can be increased 
 * to improve response time (or maybe save infinitely but again local storage might affect performance 
 * if stored infinitely)
 * 
 * This can be improved to LRU cache with a set with definite size and TTL. Any new photo being fetched and 
 * not in the cache, it can be added to the cache with new TTL. BUt, if the cache is full then it remove the 
 * oldest TTL item in cache and append the new value, else add it to the cache with new TTL. If photo being fetched
 * is in the cache, it returns it with new TTL and updates the TTL value in cache.
 **/ 
const CACHE_TIME_MS = 15 * 60 * 1000

export const savePhotos = (photos, nextPage, hasMoreItems) => {
    return {
        type: ActionTypes.SAVE_PHOTOS,
        photos,
        currentPage: nextPage,
        hasMoreItems,
    }
}

export const saveNoPhotos = (photos, hasMoreItems) => {
    return {
        type: ActionTypes.SAVE_NO_PHOTOS,
        hasMoreItems,
        photos,
    }
}

export const fetchData = (sol, currentPage) => {
    return async dispatch => {
        const nextPage = currentPage + 1

        // check to see if it's in cache
        const cachedPhotos = ls.get(sol + '-' + nextPage)
        if (cachedPhotos && cachedPhotos.length) {
            return dispatch(savePhotos(cachedPhotos, nextPage, true))
        }

        const res = await api.getRoverPhotos(sol, nextPage)
        const hasMoreItems = res && !!res.photos.length
        if (!hasMoreItems) {
            dispatch(saveNoPhotos(res.photos, hasMoreItems))
        } else {
            const cacheKey = sol + '-' + nextPage
            ls.set(cacheKey, res.photos, CACHE_TIME_MS)
            dispatch(savePhotos(res.photos, nextPage, hasMoreItems))
        }
    }
}

export const clearSolPhotos = () => {
    return {
        type: ActionTypes.CLEAR_SOL_PHOTOS,
    }
}

export const saveSolPhotos = (newPhotos, hasMoreItems) => {
    return {
        type: ActionTypes.SAVE_SOL_PHOTOS,
        photos: newPhotos,
        hasMoreItems,
    }
}

export const saveNoSolPhotos = (hasMoreItems) => {
    return {
        type: ActionTypes.SAVE_NO_SOL_PHOTOS,
        hasMoreItems,
    }
}

export const fetchDataBySol = (sol) => {
    return async dispatch => {
        dispatch(clearSolPhotos())

        const currentPage = 1
        // check to see if it's in cache
        const cachedPhotos = ls.get(sol + '-' + currentPage)
        if (cachedPhotos && cachedPhotos.length) {
            return dispatch(saveSolPhotos(cachedPhotos, true))
        }

        const res = await api.getRoverPhotos(sol, currentPage)
        const hasMoreItems = res && !!res.photos.length
        if (hasMoreItems) {
            const cacheKey = sol + '-' + currentPage
            ls.set(cacheKey, res.photos, CACHE_TIME_MS)
            dispatch(saveSolPhotos(res.photos, hasMoreItems))
        } else {
            dispatch(saveNoSolPhotos(hasMoreItems))
        }
    }
}
