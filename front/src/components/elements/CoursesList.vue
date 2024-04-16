<script>
import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import Card from 'primevue/card';

import { useUserStore } from '#store';


export default {
    name: 'CoursesList',
    data() {
        return {
            legend: '_legend_'
        }
    },
    props: {
        pageUserRole: {
            type: Number,
            required: true
        }
    },
    components: {
        Fieldset,
        Divider,
        Card
    },
    setup() {
        const user = useUserStore();

        return {
            user
        };
    },
    methods: {
        setLegend() {
            
        }
    }
};
</script>

<template>

</template>

<style scoped>

</style>