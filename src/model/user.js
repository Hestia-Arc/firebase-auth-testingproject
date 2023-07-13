 


 class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    save() {
        console.log(this.email, this.password);
        
        const user = {
            email: this.email,
            password: this.password,
        };

        localStorage.setItem('user', JSON.stringify(user) );
    }
}

export default User;