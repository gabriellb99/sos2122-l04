<script>

    export let params = {};
    import {pop} from 'svelte-spa-router';
    import { Button } from 'sveltestrap';
    import { onMount } from 'svelte';
    import Table from 'sveltestrap/src/Table.svelte';

    let contact = {};
    let updateContact = {
		name : "",
		email : "",
		phone : ""
	}

    let updatedName;
    let updatedPhone;
    let updatedEmail;

    onMount(getContact);

	async function getContact(){
		console.log("Fetching contacts.......");
		const res = await fetch("/api/v1/contacts/"+params.contactName);
		if(res.ok){
			const data = await res.json();
			contact = data;
            updatedName = contact.name;
            updatedEmail = contact.email;
            updatedPhone = contact.phone;
			console.log("Recived contacts.");
		}
	}

    async function editContact(){
        updateContact.name = updatedName;
        updateContact.email = updatedEmail;
        updateContact.phone = updatedPhone;
		console.log("Editing contact......." + JSON.stringify(updateContact.name));
		const res = await fetch("/api/v1/contacts/"+params.contactName,
			{
				method: "PUT",
				body: JSON.stringify(updateContact),
				headers: {
					"Content-Type":"application/json"
				}
			}).then(function (res){
				getContact();
			})
			console.log("Done.");
	}

</script>

<main>
    <h1>Edit Contact "{params.contactName}"</h1>
    {#await contact}
    loading
    {:then contact}
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
                <td><input bind:value="{updatedName}"></td>
                <td><input bind:value="{updatedPhone}"></td>
                <td><input bind:value="{updatedEmail}"></td>
                <td><Button outline color="warning" on:click="{editContact}">Edit</Button></td>
            </tr>	
        </tbody>
    </Table>
    {/await}
    <Button outline color="secondary" on:click='{pop}'>Back</Button>
</main>