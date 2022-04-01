<script>
    import {onMount} from 'svelte';
	let contacts = [];

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
</script>
<main>
	{#await contacts}
	loading
	{:then contacts}
	<table>
		<thead>
			<tr>
				<th>
					Name
				</th>
				<th>
					Phone
				</th>
			</tr>
		</thead>
		<tbody>
			{#each contacts as contact}
			<tr>
				<td>{contact.name}</td>
				<td>{contact.phone}</td>
			</tr>				
			{/each}
		</tbody>
	</table>
	{/await}
</main>