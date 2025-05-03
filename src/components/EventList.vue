
<template>
<template v-if="error">
<SectionCard>
    <div class="space-y-4 items-center flex flex-col">
        <div class="text-2xl font-medium text-red-500">
            Could not load events. Please try again later.
        </div>
        <div>
            <RoundButton @click="fetchEvents" class="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 focus:ring-2 focus:ring-offset-2 rounded-md px-4 py-2">
                Retry now
            </RoundButton>
        </div>
    </div>
</SectionCard>

</template>
<template v-else>
    
<section class="grid grid-cols-1 space-y gap-8 lg:grid-cols-2  " >
      <template v-if="!eventsLoading">
        <template v-if="events.length">
            <EventCard  v-for="e in events"
              :key="e.id" 
              :title="e.title"
              :when="e.date" 
              :description="e.description" 
              @register="$emit('register',e)" />
        </template>
      </template >
         <template v-else-if="!events.length">
            <div class="col-span-2 text-center text-gray-500">No Events yet.</div>
         </template>
       <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
       </template>
     </section>
</template>

</template>

<script setup>
import {ref, onMounted} from 'vue'
import EventCard from '@/components/EventCard.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import SectionCard from './SectionCard.vue';
import RoundButton from './RoundButton.vue';

defineEmits(['register'])

const events = ref([]);
const eventsLoading = ref(false);
const error= ref(null);


const fetchEvents = async () => {
  eventsLoading.value = true;
  error.value = null;
  try {
    const response1 = await fetch('http://localhost:3001/events');
    events.value = await response1.json();
    

  } catch (e) {
    error.value = e;
    console.error('Error fetching events:', error);
  } finally {
    eventsLoading.value = false;
  }
};







onMounted(() => {
  fetchEvents();
});


</script>