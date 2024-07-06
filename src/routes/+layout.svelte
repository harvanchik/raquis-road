<script>
	import '../app.css';
</script>

<header class="fixed inset-x-0 top-0 z-10 border-b border-[#694E41]/25 shadow-sm">
	<nav class="mx-auto flex h-16 items-center justify-between bg-[#faeee5] px-32">
		<a href="./">
			<img src="/src/lib/logo2.png" alt="logo" class="h-24" />
		</a>
		<!-- about and blog buttons on right side -->
		<div class="font-cormorant mr-4 text-lg">
			<a href="/about" class="mr-4 text-[#694E41]">about</a>
			<a href="/blog" class="mr-4 text-[#694E41]">blog</a>
			<a href="/subscribe" class="text-[#694E41]">subscribe</a>
		</div>
	</nav>
</header>

<slot></slot>
