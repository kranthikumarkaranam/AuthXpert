<p align="center">
   <a href="https://github.com/kranthikumarkaranam/e-commerce_admin">
    <img src="https://github.com/user-attachments/assets/c112f556-7fbe-4d2d-8508-41a2e6212fcd" alt="logo" width="180" height="180">
  </a>
  
  <h1 align="center">AuthXpert</h1>

  <p align="center">
The comprehensive authentication system encompasses a complete process, including login 🔑, registration, email account activation, password reset, and notifications. It features advanced form validation and secure routes 🔒, along with session manipulation and more...
  </p>

</p>

<br>
<br>

<h2>📜 Table of Contents</h2>

- [🚀 Live Demo](#demo)
- [🖼️ Project Screenshots](#screenshots)
- [💡 Key Features](#features)
- [🛠️ Installation & Set Up](#installation)
- [🌱 Environment Variables](#env)
- [💻 Tech Stack](#tech)
- [🍰 Contribution Guidelines](#contribution)
- [📝 Creating a Pull Request](#pull)
- [💖 Like my work?](#like)

<br>
<br>

<h2 id="demo">🚀 Live Demo</h2>

<p>Immerse yourself in its design and functionality with an interactive live demo — simply click the link to explore.</p>

**Live Preview** ➡️ [Demo](https://authxpert-kranthi.vercel.app)

<br>
<br>

<h2 id="screenshots">🖼️ Project Screenshots</h2>

<p>Feel free to check out the screenshots of my website for a sneak peek into its captivating user interface.</p>

<br>

<h3 align="center">⬅️ SignUp Page ➡️</h3>

<img src="https://github.com/user-attachments/assets/39400875-b7ed-47f5-bf1f-91938470a748" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Account Activation Email ➡️</h3>

<img src="https://github.com/user-attachments/assets/103a1dc6-66c4-4897-8f9a-6495b068fc03" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ SignIn Page ➡️</h3>

<img src="https://github.com/user-attachments/assets/4cb68b97-0df2-47ef-a6f5-4b1d2e9ba69b" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Home Page ➡️</h3>

<img src="https://github.com/user-attachments/assets/e1c165f4-8ff3-4dba-ab7e-e949a8da03f6" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Password Reset Page ➡️</h3>

<img src="https://github.com/user-attachments/assets/10a50887-93e8-430f-ac4c-0a10624bc66c" alt="screenshot" width="auto" height="auto">

<br>

<h3 align="center">⬅️ Reset Password Email ➡️</h3>

<img src="https://github.com/user-attachments/assets/835e351e-e278-4f09-a780-f5a4fdabb7f7" alt="screenshot" width="auto" height="auto">

<br>
<br>

<h2 id="features">💡 Key Features</h2>

**Here are some of the standout features of the project:**

- **Login & Registration** 🔑: Seamless user access through secure login and registration processes.

- **Email Verification and Notifications 📧**: Implemented email notifications for account verification and password resets using Elastic Email for added security.

- **Password Reset 🔄**: Simplify account recovery with a user-friendly password reset mechanism.

- **Advanced Form Validation ✅**: Enhance user experience with rigorous form validation, minimizing errors and improving data integrity.

- **Secure Routes 🔒**: Protect sensitive user data by implementing secure routing protocols.

- **Session Manipulation 🔄**: Effectively manage user sessions to maintain security and accessibility throughout the application.

- **Password Strength Estimation 🛡️**: Implemented Zxcvbn for estimating password strength, encouraging users to create stronger passwords.
- **Customizable Email Templates ✉️**: Leveraged Handlebars for personalized email notifications, enhancing user engagement.
- **Integration of Modern Tools ⚙️**: Utilized React.js, Next.js, MongoDB, TypeScript, and additional libraries such as NextAuth, React Hook Form, and Zod to create a user-friendly and secure authentication system.

_This robust authentication system not only enhances user security but also provides a smooth and reliable experience, setting a solid foundation for future expansions. Revolutionize your user experience today with a secure and efficient authentication process!_

<br>
<br>

<h2 id="installation">🛠️ Installation & Set Up</h2>

**1. Clone the repository:**

```sh
git clone https://github.com/kranthikumarkaranam/AuthXpert.git
```

**2. Go to the project directory:**

```sh
cd AuthXpert
```

**3. Install dependencies using npm:**

```sh
npm install
```

**4. Start the development server:**

> Before starting the server add these _[env](#env)_ variables.

```sh
npm run dev
```

<br>
<br>

<h2 id="env">🌱 Environment Variables</h2>

> To run this project, you need to add the following environment variables to your `.env` file in the project's root directory.

> Also, feel free to take a look at the `.env.example` file _[here](https://github.com/kranthikumarkaranam/AuthXpert/blob/main/.env.example)_.

- `MONGODB_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `GOOGLE_ID`
- `GOOGLE_SECRET`
- `DISCORD_ID`
- `DISCORD_SECRET`
- `TWITTER_ID`
- `TWITTER_SECRET`
- `FACEBOOK_ID`
- `FACEBOOK_SECRET`
- `AUTH0_ID`
- `AUTH0_SECRET`
- `AUTH0_ISSUER_URL`
- `MAILING_EMAIL`
- `MAILING_PASSWORD`
- `SMTP_HOST`
- `SMTP_EMAIL`
- `SMTP_PASSWORD`
- `SMTP_PORT`
- `RESET_TOKEN_SECRET`
- `ACTIVATION_TOKEN_SECRET`

<br>
<br>

<h2 id="tech">💻 Tech Stack</h2>

**Technologies used in the project:**

- Typescript
- React.js
- NEXT.js
- MongoDB
- Mongoose
- JWT
- Next Auth
- React Hook Form
- React Toastify
- React Spinners
- Nodemailer
- Handlebars
- axios
- bcryptjs
- validator
- zod
- zxcvbn

<br>
<br>

<h2 id="contribution">🍰 Contribution Guidelines</h2>

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- See _[Contributing](https://github.com/kranthikumarkaranam/AuthXpert/blob/main/CONTRIBUTING.md)_ for ways to get started.
- If you have suggestions for adding or removing projects, feel free to _[open an issue](https://github.com/kranthikumarkaranam/AuthXpert/issues/new)_ to discuss it, or directly create a pull request by following the guidelines _[here](#pull)_.
- Please make sure you check your spelling and grammar.
- Create individual PR for each suggestion.
- Also, please read through the _[Code of Conduct](https://github.com/kranthikumarkaranam/AuthXpert/blob/main/CODE_OF_CONDUCT.md)_ before posting your first idea as well.

<br>
<br>

<h2 id="pull">📝 Creating a Pull Request</h2>

**Follow the steps below to Initiate a Pull Request**

1. Fork the repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br>
<br>

<h2 id="like">💖 Like my work?</h2>

Thank you for taking the time to explore the project. I hope it brings value and joy to those who use it.

If you require any help or have any questions, please don't hesitate to reach out to me _[here](mailto:kranthikaranam258@gmail.com)_.

<br>
<br>
<br>

<h3 align="center">Made with ❤️ by KRANTHI.</h3>
