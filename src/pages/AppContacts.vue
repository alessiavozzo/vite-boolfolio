<script>
import { state } from '../state';
import axios from 'axios';
export default {
    name: 'AppContacts',
    data() {
        return {
            state,
            typeValue: "",
            typeStatus: false,
            displayText: "Contact me",
            typingSpeed: 100,
            erasingSpeed: 100,
            newTextDelay: 2000,
            charIndex: 0,

            name: '',
            email: '',
            message: '',
            success: false,
            errors: false
        }
    },
    methods: {
        typeText() {
            /* se la parola non è finita aggiungo una lettera a typevalue e gli do un ritardo per la scrittura della lettera successiva*/
            if (this.charIndex < this.displayText.length) {
                if (!this.typeStatus) {
                    this.typeStatus = true;
                }
                this.typeValue += this.displayText.charAt(this.charIndex);
                this.charIndex += 1;
                setTimeout(this.typeText, this.typingSpeed);

                /* se la parola è finita, metto un timer per iniziare a cancellare il testo */
            } else {
                this.typeStatus = false;
            }
        },

        sendMessage() {
            let url = state.base_api_url + state.contacts_url;
            console.log(url);
            const userData =
            {
                name: this.name,
                email: this.email,
                message: this.message
            }

            axios
                .post(url, userData)
                .then(response => {
                    console.log(response);
                    if (response.data.success) {
                        this.name = '';
                        this.email = '';
                        this.message = '';
                        this.success = response.data.message;
                    }
                    else {
                        this.success = false;
                        this.errors = response.data.errors;
                    }
                })
                .catch(error => console.log(error));
        }
    },
    created() {
        setTimeout(this.typeText, this.newTextDelay + 200);

    }
}
</script>

<template>
    <section id="contacts">
        <div class="container">
            <h3>
                <span class="typed-text space-mono-regular" v-html="typeValue"></span>
                <span class="blinking-cursor">|</span>
                <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
            </h3>

            <div class="form-container fira-mono-regular">

                <form action="" method="" @submit.prevent="sendMessage()">
                    <div class="user-data">
                        <div class="input-group">
                            <input type="text" name="name" id="name" v-model="name" required>
                            <label>Username</label>
                        </div>
                        <div class="input-group">
                            <input type="email" name="email" id="email" v-model="email" required>
                            <label>Email</label>
                        </div>
                    </div>
                    <div class="message">
                        <input type="text" name="message" id="message" v-model="message" required>
                        <label>Your message</label>
                    </div>

                    <div class="submit-button">
                        <button type="submit" class="btn fira-mono-regular">Send message</button>
                    </div>
                </form>

            </div>

        </div>
    </section>
</template>



<style scoped>
#contacts {
    padding-top: 80px;

    .container {
        max-width: 1200px;

        h3 {
            padding: 5rem 0 2rem 0;
            font-size: 3rem;

            .typed-text {
                color: var(--portfolio-main);
                text-transform: uppercase;
            }
        }

        .form-container {
            margin-top: 5rem;

            .user-data {
                display: flex;
                justify-content: space-between;
                gap: 4rem;
                padding-bottom: 6rem;

                .input-group {
                    width: 40%;
                    position: relative;
                }

            }

            .message {
                width: 100%;
                position: relative;
            }


            input {
                width: 100%;
                padding: 0.5rem 0;
                font-size: 16px;
                border: none;
                border-bottom: 1px solid var(--portfolio-light);
                outline: none;
                background: transparent;
                color: var(--portfolio-light);
            }

            label {
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 1rem 0;
                font-size: 16px;
                color: var(--portfolio-text-secondary);
                transition: .5s;
                pointer-events: none;
            }

            input:focus~label,
            input:valid~label {
                top: -2rem;
                left: 0;
                color: var(--portfolio-main);
                font-size: 12px;
            }

            .submit-button {
                display: flex;
                justify-content: center;
                margin-top: 5rem;
            }

        }
    }
}
</style>