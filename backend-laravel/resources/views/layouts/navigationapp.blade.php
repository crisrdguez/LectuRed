    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"  style="background:#122747">
        <div class="flex justify-between h-16">
            <div class="flex">
                <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex" >
                    <div class="shrink-0 flex items-center">
                    <x-application-logo class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </div>
                    <x-nav-link :href="'http://localhost:4200/home'" :active="request()->routeIs('dashboard')">
                        Home
                    </x-nav-link>
                </div>
            </div>
        </div>
    </div>