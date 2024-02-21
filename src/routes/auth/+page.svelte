<script>
	import { goto } from '$app/navigation';
	import { userSignIn, userSignUp } from '$lib/apis/auths';
	import { WEBUI_API_BASE_URL, WEBUI_NAME } from '$lib/constants';
	import { config, user } from '$lib/stores';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let loaded = false;
	let mode = 'signin';

	let name = '';
	let email = '';
	let password = '';

	const setSessionUser = async (sessionUser) => {
		if (sessionUser) {
			console.log(sessionUser);
			toast.success(`You're now logged in.`);
			localStorage.token = sessionUser.token;
			await user.set(sessionUser);
			goto('/');
		}
	};

	const signInHandler = async () => {
		const sessionUser = await userSignIn(email, password).catch((error) => {
			toast.error(error);
			return null;
		});

		await setSessionUser(sessionUser);
	};

	const signUpHandler = async () => {
		const sessionUser = await userSignUp(name, email, password).catch((error) => {
			toast.error(error);
			return null;
		});

		await setSessionUser(sessionUser);
	};

	const submitHandler = async () => {
		if (mode === 'signin') {
			await signInHandler();
		} else {
			await signUpHandler();
		}
	};

	onMount(async () => {
		if ($user !== undefined) {
			await goto('/');
		}
		loaded = true;
	});
</script>

{#if loaded}
	<div class="fixed m-10 z-50">
		<div class="flex space-x-2">
			<div class=" self-center">
				<img src="/kdh-ollama.png" class="w-20" />
			</div>
		</div>
	</div>

	<div class=" bg-white min-h-screen w-full flex justify-center font-mona">
		<!-- <div class="hidden lg:flex lg:flex-1 px-10 md:px-16 w-full bg-yellow-50 justify-center">
			<div class=" my-auto pb-16 text-left">
				<div>
					<div class=" font-bold text-yellow-600 text-4xl">
						Get up and running with <br />large language models, locally.
					</div>

					<div class="mt-2 text-yellow-600 text-xl">
						Run Llama 2, Code Llama, and other models. Customize and create your own.
					</div>
				</div>
			</div>
		</div> -->

		<div class="w-full max-w-lg px-10 md:px-16 bg-white min-h-screen flex flex-col">
			<div class=" my-auto pb-10 w-full">
				<form
					class=" flex flex-col justify-center"
					on:submit|preventDefault={() => {
						submitHandler();
					}}
				>
					<div class=" text-xl md:text-2xl font-bold">
						{mode === 'signin' ? 'Sign in' : 'Sign up'} to KDH KI-Playground
					</div>

					{#if mode === 'signup'}
						<div class=" mt-1 text-xs font-medium text-gray-500">
							ⓘ {WEBUI_NAME} does not make any external connections, and your data stays securely on
							your locally hosted server.
						</div>
					{/if}

					<div class="flex flex-col mt-4">
						{#if mode === 'signup'}
							<div>
								<div class=" text-sm font-semibold text-left mb-1">Name</div>
								<input
									bind:value={name}
									type="text"
									class=" border px-4 py-2.5 rounded-2xl w-full text-sm"
									autocomplete="name"
									placeholder="Enter Your Full Name"
									required
								/>
							</div>

							<hr class=" my-3" />
						{/if}

						<div class="mb-2">
							<div class=" text-sm font-semibold text-left mb-1">Email</div>
							<input
								bind:value={email}
								type="email"
								class=" border px-4 py-2.5 rounded-2xl w-full text-sm"
								autocomplete="email"
								placeholder="Enter Your Email"
								required
							/>
						</div>

						<div>
							<div class=" text-sm font-semibold text-left mb-1">Password</div>
							<input
								bind:value={password}
								type="password"
								class=" border px-4 py-2.5 rounded-2xl w-full text-sm"
								placeholder="Enter Your Password"
								autocomplete="current-password"
								required
							/>
						</div>
					</div>

					<div class="mt-5">
						<button
							class=" bg-gray-900 hover:bg-gray-800 w-full rounded-full text-white font-semibold text-sm py-3 transition"
							type="submit"
						>
							{mode === 'signin' ? 'Sign In' : 'Create Account'}
						</button>

						<div class=" mt-4 text-sm text-center">
							{mode === 'signin' ? `Don't have an account?` : `Already have an account?`}

							<button
								class=" font-medium underline"
								type="button"
								on:click={() => {
									if (mode === 'signin') {
										mode = 'signup';
									} else {
										mode = 'signin';
									}
								}}
							>
								{mode === 'signin' ? `Sign up` : `Sign In`}
							</button>
						</div>
					</div>
				</form>
				<div class="mt-5">
					

					<div class="flex items-start space-x-2 mt-4 text-sm text-justify hyphens-auto" lang="de">
						<svg class="w-6 h-6 text-gray-900 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clip-rule="evenodd"/>
						  </svg>
						  
						<span class="ml-2">Der KI-Playground ist ein Service der Kompetenzwerkstatt Digital Humanities der Universitätsbibliothek an der Humboldt-Universität zu Berlin. Dieser wird zunächst ausschließlich im Rahmen des KDH-Workshops "Generative KI" bereitgestellt. Die Bereitstellung endet mit dem Workshop-Abschluss am 04.03.2024.</span>
						</div>
				</div>
			</div>
		</div>


	</div>

<footer class="bg-white m-4"> <!--dark:bg-gray-900-->
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://blogs.hu-berlin.de/furesh/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/kdh-blue.png" class="h-20" alt="KDH Logo" />
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0"> <!--dark:text-gray-400-->
                <!--<li>
                    <a href="https://blogs.hu-berlin.de/furesh/" class="hover:underline me-4 md:me-6">KDH Website</a>
                </li>-->
                <li class="flex flex-col items-center">	
                    <p class="me-4 md:me-6 text-center">
						Your data will be stored exclusively on HU Berlin servers and<br>will not be passed on to third parties.
					</p>
					<svg class="w-6 h-6 mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
						<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
					</svg>
                </li>
                <!--<li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>-->
            </ul>
        </div>
        <hr class="my-6 sm:mx-auto lg:my-8" /> <!--dark:border-gray-900-->
        <span class="block text-sm text-gray-500 sm:text-center"><!--dark:text-gray-400-->© 2024 <a href="https://blogs.hu-berlin.de/furesh/" class="hover:underline">KDH UB HU-Berlin</a>. MIT License.</span>
    </div>
</footer>



{/if}

<style>
	.font-mona {
		font-family: 'Mona Sans';
	}
</style>
