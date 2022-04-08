<script>
	import Router from 'svelte-spa-router';
	import ContactsTable from './ContactsTable.svelte';
	import Home from './Home.svelte';
	import EditContact from './EditContact.svelte';

	const routes ={
		"/": Home,
		"/contactsList": ContactsTable,
		"/contact/:contactName": EditContact
	}

</script>

<main>
	<h1>Contact Manager</h1>
	<Router {routes} />
</main>

