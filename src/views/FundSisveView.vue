<script setup lang="ts">
import { ref } from 'vue'
import FundSisve from '@/layouts/FundSisve.vue'
import HeroSection from '@/components/Login/HeroSection.vue'
import LoginPanel from '@/components/Login/LoginPanel.vue'

const showLogin = ref(false)

function openLogin() {
  showLogin.value = true
}
</script>

<template>
    
    <FundSisve>
        <div
            class="login-page"
            :class="{ active: showLogin }"
        >

            

            

        </div>
    </FundSisve>

</template>