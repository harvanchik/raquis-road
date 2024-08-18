<script>
	import '../app.css';
	import logo from '$lib/img/logo.webp';
</script>

<!-- START: Header (displayed on every single screen) -->
<header class="fixed inset-x-0 top-0 z-10">
	<!-- START: Navigation Bar -->
	<nav
		class="mx-auto flex h-24 items-center justify-between border-b border-[#694E41]/25 bg-[#faeee5] px-20 shadow-sm sm:px-44"
	>
		<!-- START: Logo -->
		<a href="./" class="select-none">
			<img src={logo} alt="logo" class="h-16" />
		</a>
		<!-- END: Logo -->

		<!-- START: Nav Buttons -->
		<div class="flex flex-row space-x-10 font-cormorant text-2xl text-[#694E41]">
			<a href="/about" class="hover:text-[#9e7a69]">about</a>
			<a href="/blog" class="hover:text-[#9e7a69]">blog</a>
			<a href="/subscribe" class="hover:text-[#9e7a69]">subscribe</a>
		</div>
		<!-- END: Nav Buttons -->
	</nav>
	<!-- END: Navigation Bar -->
	<div class="flex h-10 w-full bg-[#7b5e50] drop-shadow-lg">
		<p class="mx-auto my-auto font-cormorant text-[1.37rem] italic text-[#faeee5]">
			embrace a journey of faith, wellness, and womanhood
		</p>
	</div>
</header>
<!-- END: Header -->

<slot></slot>
