<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/layouts/HeroLayout.vue'
import HeroSection from '@/components/Login/HeroSection.vue'
import LoginPanel from '@/components/Login/LoginPanel.vue'
import FundSisve from '@/layouts/FundSisve.vue'
const showLogin = ref(false)

function openLogin() {
  showLogin.value = true
}
</script>

<template>
    
    <AppLayout>
        <div
            class="login-page"
            :class="{ active: showLogin }"
        >

            <HeroSection
                @open-login="openLogin"
            />

            <LoginPanel
                :visible="showLogin"
            />

        </div>
    </AppLayout>

</template>