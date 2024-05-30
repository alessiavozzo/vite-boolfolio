<script>
export default {
    name: 'ProjectCard',
    props: ['project']

}
</script>



<template>

    <div class="col">
        <div class="card">

            <img v-if="project.project_image.startsWith('uploads')"
                :src="base_api_url + '/storage/' + project.project_image" alt="">

            <img v-else :src="project.project_image" alt="">

            {{ project.title }}
        </div>
    </div>

</template>



<style scoped></style>