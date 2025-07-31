<script lang="ts">
	const { data } = $props();

	$inspect(data);
</script>

<h1>{data.personal_info.name}</h1>
