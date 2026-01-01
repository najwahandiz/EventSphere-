
import axios from 'axios';

const API_URL = "https://694d3b39ad0f8c8e6e201c01.mockapi.io/api/v1/events";


// Fetch all events
export async function getEvents() {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.log("error getting data", error);
        throw error;
    }
}

// Add a new event
export async function addEvent(newEvent) {
    try {
        const res = await axios.post(API_URL, newEvent);
        return res.data;
    } catch (error) {
        console.log("error adding event", error);
        throw error;
    }
}

//update event
export async function updateEvent (eventToUpdate){
    try {
        const res = await axios.put(`${API_URL}/${eventToUpdate.id}`, eventToUpdate )
        return res.data
    } catch (error) {
        console.log("error in updating data", error);
        throw error;
    }
}


//delete event
export async function deleteEvent(eventToDelete) {
    try {
       const res = await axios.delete(`${API_URL}/${eventToDelete.id}`)
       return res.data
    } catch (error) {
        console.log("error in deleting event", error);
        throw error;
    }

}

