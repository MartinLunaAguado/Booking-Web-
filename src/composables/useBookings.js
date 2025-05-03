 import { ref } from 'vue';

 
const bookings = ref([]);
const bookingsLoading = ref(false);



    const fetchBookings = async () => {
        bookingsLoading.value = true;
        try {
          const response2 = await fetch('http://localhost:3001/bookings');
          bookings.value = await response2.json();
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          bookingsLoading.value = false;
        }
      };

      const handleRegistration = async (event) => {
        if (bookings.value.some((b) => b.eventId === event.id && b.userId === 1)) {
          alert('You already booked this event');
          return;
        }
           const newBooking = {
            id:Date.now().toString(),
            userId: 1,
            eventId: event.id,
            eventTitle: event.title, 
            status: 'pending'
          };
      
          bookings.value.push(newBooking);
      
         try{
         const response = await fetch('http://localhost:3001/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...newBooking, 
              status:'confirmed'}),
          });
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const index = findBookingById(newBooking.id); 
          bookings.value[index].status = await response.json();
        
        
        }
         catch (error) {
            console.error('Error creating booking:', error);
            bookings.value= bookings.value.filter((b) => b.id !== newBooking.id);
      
          } 
          console.log('Booking created:', newBooking);
          
      
      }; 
      const findBookingById = (id) => 
        bookings.value.findIndex((b) => b.id === id);
      
      
   const cancelBooking = async (booking) => {
        const index = findBookingById(booking);
        const originalBooking = bookings.value[index];
        bookings.value.splice(index, 1);
        try {
          const response = await fetch(`http://localhost:3001/bookings/${booking}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error('Error deleting booking:', error);
          bookings.value.splice(index, 0, originalBooking);
        }
        
      };


export default function useBookings() {
  return {
    bookings,
    bookingsLoading,
    fetchBookings,
    handleRegistration,
    cancelBooking,
  };
}



