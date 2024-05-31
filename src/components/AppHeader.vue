<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <header>

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav gap-3">
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'projects' }">Projects</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'about' }">About</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'contacts' }">Contacts</router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>





    </header>
</template>



<style scoped></style>