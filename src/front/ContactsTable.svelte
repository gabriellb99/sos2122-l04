<script>
    import {onMount} from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte';

	let contacts = [];
	let newContact = {
		name : "",
		email : "",
		phone : ""
	}

	onMount(getContacts);

	async function getContacts(){
		console.log("Fetching contacts.......");
		const res = await fetch("/api/v1/contacts");
		if(res.ok){
			const data = await res.json();
			contacts = data;
			console.log("Recived contacts "+contacts.length);
		}
	}

	async function insertContact(){
		console.log("Inserting contacts......." + JSON.stringify(newContact));
		const res = await fetch("/api/v1/contacts/",
			{
				method: "POST",
				body: JSON.stringify(newContact),
				headers: {
					"Content-Type":"application/json"
				}
			}).then(function (res){
				getContacts();
			})
			console.log("Done.");
	}
</script>
<main>
	{#await contacts}
	loading
	{:then contacts}
	<Table bordered>
		<thead>
			<tr>
				<th>Name</th>
				<th>Phone</th>
				<th>Email</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><input id="name" bind:value="{newContact.name}"></td>
				<td><input id="phone" bind:value="{newContact.phone}"></td>
				<td><input id="email" bind:value="{newContact.email}"></td>
				<td><Button outline color="primary" on:click="{insertContact}">Insert</Button></td>
			</tr>
			{#each contacts as contact}
			<tr>
				<td>{contact.name}</td>
				<td>{contact.phone}</td>
				<td>{contact.email}</td>
				<td><Button outline color="warning" on:click={function(){
					window.location.href =  `/#/contact/${contact.name}`
				}}>Edit</Button></td>
			</tr>				
			{/each}
		</tbody>
	</Table>
	{/await}
</main>