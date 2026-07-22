<script setup lang="ts">
import { ref } from 'vue'
import FundSisveLayout from '@/layouts/FundSisveLayout.vue'
import BaseButton from '@/components/Login/button/BaseButton.vue'
import BaseInput from '@/components/Login/button/BaseInput.vue'
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

        <BaseInput
            v-model="showLogin"
            label="Usuario"
            placeholder="Ingrese su usuario"
            hint="Este es un campo obligatorio"
        />

        <BaseButton>
        <div
            @click="openLogin"
        >
            Abrir Login
        </div>

        </BaseButton>

        


        
        <BaseButton 
            variant="secondary">
        <div
           
        >
           cancelar
        </div>

        </BaseButton>


        
    </FundSisveLayout>

</template>