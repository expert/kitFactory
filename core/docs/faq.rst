Faq
===

.. attention::
If you have issues with installation, contact us by `email <https://themeforest.net/item/webelieve-responsive-multipurpose-church-theme/19736499/support>`_ . Our support team will assit you.

    Please specify in your email the following data:

    * **website url**
    * WordPress admin login credentials **login and password**
    * SSH and/or FTP credentials **hostname, username and password**
    * cPanel user and password (if you have it)

    **Make sure to change all the passwords that you've sent us after the issue is resolved**

Installation issues:
--------------------

I got a white screen/nothing happens/takes to long when I try import demo data
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    Make sure your server meets the :ref:`theme requirements <theme-requirements>`

After installation I got a PHP error `Error: Parse error: syntax error, unexpected '[' in`
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    This error means that you have PHP version is lower than **5.4**.
    Upgrade you PHP to match the :ref:`minimal required PHP version <theme-requirements>`.
    If you don't know how to do this, please consult your hosting provider, usually they can do this for you free of charge.

I got a error `Fatal error: Allowed memory size of 67108864 bytes exhausted (tried to allocate 72 bytes) in`
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    This error means that you increase your PHP **memory_limit** setting to the value defined in
    :ref:`theme requirements <theme-requirements>`. If you don't know how to do this, please consult your hosting
    provider.


When I am uploading it to install it gives me an error message saying it is missing style.css stylesheet.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    .. image:: img/installation-stylesheet-missing.png


    Seems like you try install **wrong zip** folder. Please download from themeforest "Instalable WordPress file only" and then try upload it.

I got a message from Themeforest that WeBelieve has updated. How I can update the theme?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    Please see this `article <update.html>`_

Configuration issues:
---------------------

I have installed theme WeBelieve, where do I can start configuration ?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    You should start from **Customizer**. See this `customizer options <customizer.html>`_ and `base configuration <configuration.html>`_.

Google maps on my website are not working
+++++++++++++++++++++++++++++++++++++++++

    Recently Google changed the policy of providing access to his services. This affected also google maps, now all request to service require an API key.
    We provide by default our key in theme, but it's good idea to change it to your. The instructions how do this `are here <map.html>`_.


What languages does the theme support ?
+++++++++++++++++++++++++++++++++++++++

    The theme supports any language. See `here <translating.html>`_ a short guide.

Does this theme support RTL ?
+++++++++++++++++++++++++++++

    Yes, it does.


After I have translated some words of the theme, some pages stop to working.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    After translation url parts, the WordPress permalink cache should be dropped.
    The simplest way is to go to  **Settings / Permalinks**, select **Post name** and click on Save.


How to add "Read More" button for post on blog page?
++++++++++++++++++++++++++++++++++++++++++++++++++++

    You need to insert "Read More" tag in post body in the end of excerpt text.


Why I don't receive mail using contact form?
++++++++++++++++++++++++++++++++++++++++++++

First of all you need to contact your hosting provider and ask if your server support mailing functionality.

Open "Mail" tab. In the top you can see all available tags. You need to place them in necessary fields. In field "To" paste email address you will use to receive messages.

.. image:: img/form-setup.png

You can edit demo tags, add your own however you like. Check `Contact Form 7 plugin documentation <https://contactform7.com/docs/>`_ to find more information.

Pre-purchase questions:
-----------------------

If i purchase the theme, will i get unminified js & css (dev version) ?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    Yes, there are unminified versions in the package.
    Also we can share our Gulp configuration so that you can compile the assets by yourself.

Is the $39 paid per month or one time to download the layout? Any renewal fees?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    39$ is a one time price, no renewal fees, it includes 6 month of support

The premium plugins are requiring activation, are they trial?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    The plugins are not trial, they are full versions that you can use as long as you want.

    We have agreement and permission from the corresponding plugin authors to provide free version for customers of our theme.

    For example let's take Visual Composer, here's the only place you can get it https://codecanyon.net/item/visual-composer-page-builder-for-wordpress/242431?s_rank=1 .
    So you'd have to pay 34$ to use it, however due to the fact that it is included in our theme, you can use it for free, activating you personal license is fully optional!

    **So let to reiterate:**

    #. These are non-trial plugins, you can use them as long as you want, they have exactly the same features as the full versions.
    #. Activating the license is fully optional and ONLY if you want direct support and updates from their authors. Currently the support and updates are provided for us.


Other questions
---------------

How do i find out what theme version do I have?
+++++++++++++++++++++++++++++++++++++++++++++++

    To find out which version you have, go to **Appearance / Themes** and click on current theme image, you should
    the theme version to right of the name.

    .. image:: img/theme-version.png
