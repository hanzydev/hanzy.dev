export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (htmlContext) => {
        htmlContext.head.push(`<script
            defer
            data-domain="hanzy.dev"
            src="https://events.asuna-chan.xyz/js/script.file-downloads.hash.outbound-links.pageview-props.js"
        ></script>
        <script>
            window.plausible =
                window.plausible ||
                function () {
                    (window.plausible.q = window.plausible.q || []).push(arguments);
                };
        </script>`);
    });
});
