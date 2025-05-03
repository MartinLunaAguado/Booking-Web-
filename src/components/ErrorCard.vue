<template>
<SectionCard>
    <div class="space-y-4 items-center flex flex-col">
        <div class="text-2xl font-medium text-red-500"> <slot/>       </div>
        <div>
            <RoundButton v-if="retry" @click="retry" class="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 focus:ring-2 focus:ring-offset-2 rounded-md px-4 py-2">
                Retry now
            </RoundButton  >
        </div>
    </div>
</SectionCard>

</template>

<script setup>
import SectionCard from './SectionCard.vue';
import RoundButton from './RoundButton.vue';


defineProps({
  retry: {
    type: Function,
    required: false,
  },
});




</script>