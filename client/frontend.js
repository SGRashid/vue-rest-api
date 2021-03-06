import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

Vue.component('loader', {
    template:
        `
        <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
        </div>
        `
});

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            contacts: []
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim();
        }
    },
    methods: {
        async createContact() {
            this.loading = true;
            const {...contact} = this.form;
            const newContact = await request('/api/contacts', 'POST', contact);
            this.contacts.push(newContact);
            this.form.name = this.form.value = '';
            this.loading = false;
        },
        async markContact(id) {
            this.loading = true;
            const contact = this.contacts.find(c => c.id === id);
            await request('/api/contacts/' + id, 'PUT', {
                ...contact,
                marked: !contact.marked
            });
            contact.marked = !contact.marked;
            this.loading = false;
        },
        async removeContact(id) {
            this.loading = true;
            await request('api/contacts/' + id, 'DELETE');
            this.contacts = this.contacts.filter(c => c.id !== id);
            this.loading = false;
        },
    },
    async mounted() {
        this.loading = true;
        this.contacts = await request('/api/contacts');
        this.loading = false;
    }

});

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });
        return await response.json();
    } catch (e) {
        console.warn('Error', e.message);
    }
}