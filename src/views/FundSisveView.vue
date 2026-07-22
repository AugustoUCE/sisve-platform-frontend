<script setup lang="ts">
import { ref } from 'vue'
import FundSisveLayout from '@/layouts/FundSisveLayout.vue'
import BaseButton from '@/components/Login/button/BaseButton.vue'
const showLogin = ref(false)
function openLogin() { 
  showLogin.value = true
}
</script>

<template>
    
    <FundSisveLayout>
        <div
            class="linkme-card"
            :class="{ active: showLogin }"
        >

            Login view formado de componentes
            <br>
            papeleta votacion 

            

        </div>
        <BaseButton>
        <div
            @click="openLogin"
        >
            Abrir Login
        </div>
        </BaseButton>
    </FundSisveLayout>

</template>