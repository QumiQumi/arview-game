<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<h3>Угадай слово</h3>
			</div>
		</v-app-bar>

		<v-main>
			<HelloWorld />
		</v-main>
	</v-app>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
export default {
	data: () => ({
		//
	}),
	components: {
		HelloWorld,
	},
};
</script>
