<script setup lang="ts">
import { ref } from 'vue'
import FundSisve from '@/layouts/FundSisve.vue'
const showLogin = ref(false)
function openLogin() { 
  showLogin.value = true
}
</script>

<template>
    
    <FundSisve>
        <div
            class="linkme-card"
            :class="{ active: showLogin }"
        >

            Login view formado de componentes
            <br>
            papeleta votacion 

            

        </div>
    </FundSisve>

</template>