import _ from 'lodash';
import { FETCH_POSTS } from '../actions';
import { FETCH_POST } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            const post = action.payload.data
            const newState = { ...state }
            console.log('post', newState)
            newState[post.id] = post
            console.log('new state : ', post)
            return newState
        case FETCH_POSTS:
            console.log('action', action)
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}