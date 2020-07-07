import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                name: '',
                value: ''
            },
            contacts: [
                {id: 1, name: 'Сергей', value: '8-800-2000-600', marked: false}
            ]
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim();
        }
    },
    methods: {
        createContact() {
            const {...contact} = this.form;
            this.contacts.push({...contact, id: Date.now(), marked: false});
            this.form.name = this.form.value = '';
        },
        markContact(id) {
            const contact = this.contacts.find(c => c.id === id);
            contact.marked = !contact.marked;
        },
        removeContact(id) {
            this.contacts = this.contacts.filter(c => c.id !== id);
        },
    }
});