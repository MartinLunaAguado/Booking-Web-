<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBookings" >Error fetching bookings</ErrorCard>

  </template>

   <template v-else>

   <section class="flex flex-col gap-4">
           <template v-if="!bookingsLoading">
            <BookingItem v-for="b in bookings" :key="b.id"    :title="b.eventTitle" :status="b.status" @cancel="cancelBooking(b.id)"/>
          </template>
          <template v-else>
            <LoadingBooking v-for="i in 4" :key="i" />

         </template>
      
    </section>
    </template>
</template>
<script setup>
import { onMounted} from 'vue'
import LoadingBooking from '@/components/LoadingBooking.vue'
import BookingItem from '@/components/BookingItem.vue'
import useBookings from '@/composables/useBookings'
import ErrorCard from '@/components/ErrorCard.vue'

const {bookings, bookingsLoading, fetchBookings,error, cancelBooking} = useBookings();



onMounted(() => {
  fetchBookings()

});



</script>