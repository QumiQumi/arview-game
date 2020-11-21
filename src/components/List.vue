<template>
	<v-card max-width="450" class="mx-auto">
		<v-toolbar color="cyan" dark>
			<v-toolbar-title>История слов</v-toolbar-title>
		</v-toolbar>

		<v-list three-line min-width="450">
			<template v-for="(item, index) in items">
				<v-subheader
					v-if="item.header"
					:key="item.header"
					v-text="item.header"
				></v-subheader>

				<v-divider
					v-else-if="item.divider"
					:key="index"
					:inset="item.inset"
				></v-divider>

				<v-list-item v-else :key="item.title">
					<v-list-item-avatar>
						<v-img :src="item.avatar"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list>
	</v-card>
</template>

<script>
export default {
	props: {
		items: Array,
	},
};
</script>

<style>
</style>