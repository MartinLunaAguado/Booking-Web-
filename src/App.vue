
<template>
  <main class="container w-full h-screen px-4 py-4  mb-auto space-y-8 mx-auto">
     <h1 class="text-4xl font-medium">Event Booking App</h1>
     <h2 class="text-2xl font-medium">All Events</h2>
     <EventList @register="handleRegistration($event)"/>
     <h2 class="text-2xl font-medium " >Your Bookings</h2>
    <section class="flex flex-col gap-4">
      <template v-if="!bookingsLoading">
        <BookingItem v-for="b in bookings" :key="b.id"  :title="b.eventTitle" :status="b.status" @cancel="cancelBooking(b.id)"/>
      </template>
      <template v-else>
        <LoadingBooking v-for="i in 4" :key="i" />

      </template>
      
    </section>
     
   </main>
</template>



<script setup>
import { onMounted} from 'vue'
import EventList from '@/components/EventList.vue'
import LoadingBooking from '@/components/LoadingBooking.vue'
import BookingItem from '@/components/BookingItem.vue'
import useBookings from './composables/useBookings'

const {bookings, bookingsLoading, fetchBookings, handleRegistration, cancelBooking} = useBookings();




onMounted(() => {
  fetchBookings();

});




</script>
