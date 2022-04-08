<script>

    export let params = {};
    import {pop} from 'svelte-spa-router';
    import { Button } from 'sveltestrap';

</script>

<main>
    This is the view of contact {params.contactName}
    <Button outline color="secondary" on:click='{pop}'>Back</Button>




</main>