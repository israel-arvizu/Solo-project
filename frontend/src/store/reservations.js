import { csrfFetch } from "./csrf";

const MAKE_RESERVATION = 'reservation/CREATE';
const LOAD_RESRVATION = 'reservation/ALL'

//ACTIONS
const createReservation = (reservation) => {
    return {
        type: MAKE_RESERVATION,
        payload: reservation
    }
}

const loadAllReservation = (reservations) => {
    return {
        type: LOAD_RESERVATION,
        payload: reservations
    }
}
//THUNKERS
export const addReservation = ({resortId, userId, checkInDate, checkOutDate, confirmationNumber}) => async (dispatch) => {
    const response = await csrfFetch('/api/reservation', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            resortId,
            startDate: checkInDate,
            endDate: checkOutDate,
            confirmationNumber
        })
    });
    const data = await response.json();
    dispatch(createReservation(data.reservation));
    return JSON.stringify("Successfuly Booked!");
}

export const loadReservations = () => async (dispatch) => {
  const response = await csrfFetch('/api/reservation/user/:id');
  const data = await response.json();
  dispatch(loadAllReservation(data.reservation));
  return response
}
//REDUCERS
const initialState = {reservations: null}
const reservationReducer = (state= initialState, action) => {
    let newState;
    switch(action.type){
        case MAKE_RESERVATION:
            //DONT NEED TO UPDATE STATE FOR RESERVATIONS -- RETURNS DEFAULT
            return state;
        case LOAD_RESERVATION:
            newstate = Object.assign({}, state);
        default:
            return state;
    }
}

export default reservationReducer;
