<template>
    <div class="w-100 table-responsive mx-auto">
        <table class="table table-striped mx-auto mw-100" style="max-width: 400px;">
            <thead class="table-secondary text-start text-dark">
                <tr>
                    <th 
                        class="text-nowrap" 
                        v-for="(col, index) in columns" 
                        :key="index"
                        :style="{
                            fontSize: '15px',
                            fontWeight: 500
                        }"
                    >{{ col.value }}</th>
                </tr>
            </thead>
            <tbody class="text-start">
                <tr v-for="(row, index) in rows" :key="index">
                    <td 
                        v-for="(item, idx) in columns" 
                        :key="idx" 
                        :style="{
                            fontSize: '13px',
                            fontWeight: 400
                        }"
                    >
                        {{ row[`${item.key}`] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TableComp',
    props: {
        columns: Array,
        rows: Array
    },
}
</script>

<style>

</style>