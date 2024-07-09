<script>
	import '../app.css';
	import logo from '$lib/img/logo.webp';
</script>

<!-- START: Header (displayed on every single screen) -->
<header class="fixed inset-x-0 top-0 z-10">
	<!-- START: Navigation Bar -->
	<nav
		class="mx-auto flex h-28 items-center justify-between border-b border-[#694E41]/25 bg-[#faeee5] px-56 shadow-sm"
	>
		<!-- START: Logo -->
		<a href="./" class="select-none">
			<img src={logo} alt="logo" class="h-[5.25rem]" />
		</a>
		<!-- END: Logo -->

		<!-- START: Nav Buttons -->
		<div class="flex flex-row space-x-10 font-cormorant text-3xl text-[#694E41]">
			<a href="/about" class="hover:text-[#9e7a69]">about</a>
			<a href="/blog" class="hover:text-[#9e7a69]">blog</a>
			<a href="/subscribe" class="hover:text-[#9e7a69]">subscribe</a>
		</div>
		<!-- END: Nav Buttons -->
	</nav>
	<!-- END: Navigation Bar -->
</header>
<!-- END: Header -->

<slot></slot>
