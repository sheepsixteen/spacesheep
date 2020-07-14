---
layout: post
title: I know html, now what?
date: 2020-07-13 16:56 +0100
learn:
  - hosting a basic website on vercel, netlify, and github pages
---

# I know HTML, now what?

[Skip to the mission](#the-mission)

## Background

After completeling that [one codeacadmey
course](https://www.codecademy.com/learn/learn-html), you know how tags work,
some html elements, maybe even some [a11y](https://a11yproject.com/) if you're
lucky. You can probably make a simple web page.

Now, you want to show off your progress... How exactly do you do that? How do
your favourite websites actually, website?

Well, you might have heard that the internet is made up of loads of computers
talking to eachother, and this essentialy true. A website is just a computer
which always answers another computer's questions with some html files.

{% include image.html
url="/assets/posts/i-know-html-now-what/server-client-diagram.png"
description="A server-client diagram, the client sends a request (through
network cables) for the homepage, the server responds by sending files." %}

Although you could set up your computer to be a web server, there are a couple
issues:

  * For one, you would have to keep your computer on *all the time*... What if
  the power cuts out?

  * Your computer would also need to be super fast to handle all the millions of
  requests your webiste is going to receive. (wishful thinking)

  * You would have to open up your computer to the scary internet. Anyone would
  be able to make requests to your computer, which means that if your operating
  system isn't up-to-date, hackers could breach it!

For these reasons you might not want your computer to be a web server, and
instead: find a web server that you can buy/rent (hopefully without spending too
much money).

<section id="mission">

## Your mission

**Your mission is to upload <a
href="/assets/posts/i-know-html-now-what/index.html" title="Click to download
the file you should upload to the internet" download>this html file</a> to the
internet**.  You should be able to access it from your computer, from your
phone, and from your friend's phone.

### Constraints

  - The file must be able to be viewed from anywhere. **This means that you can't
  just host it on localhost on your computer.**

  - The file should be showed as rendered html, not just the raw file. ([How does the browser know?](https://stackoverflow.com/questions/3828352/what-is-a-mime-type#:~:text=A%20MIME%20type%20is%20a,extensions%20do%20on%20Microsoft%20Windows.))

  - You can't spend **any** money.

### Hints

<details>
  <summary>Click here to show the first hint</summary>

  Try googling "How to host website for free on github"
</details>

<details>
  <summary>Click here to show the second hint</summary>

  You could use [Github pages](https://pages.github.com/).
</details>

</section>

## After you have done the mission

**Don't look here unless you have completed the mission!**

If you followed the hint, you should have created a GitHub account, then a
repository (often called a "repo"). Then, uploaded the file. You should have
then pressed "settings" and scrolled to the "GitHub Pages" section, where you
can enable GitHub pages.

If you found a different solution, amazing! Feel free to share your solution
with the [community](/community).

## Other hosting platforms

If you feel really inspired, you can try a different hosting platofrm. Here's a
(by no means extensive) list:

  1. [Vercel](https://vercel.com/about)

Vercel is specifically built for [next.js](https://nextjs.org/), _but_, you can
put loads of things there, including static html files. They have some pretty
unique solutions to problems the web developers face every day, you might want
to read [their blog](https://vercel.com/blog). Vercel is used for hobby projects
(because they are completely free) as well as for large-scale services.

  2. [Heroku](https://www.heroku.com/about)

Heroku is a bit more complex, and focused towards big companies. However, they
still provide a generous free plan. One of their best features is the
marketplace; you can add modules to your projects (e.g. a database) with the
click of a button. This is perfect if you want to extend your website without
having to set up loads of boring stuff. Marvelous!

  3. [Firebase](https://www.heroku.com/about)

Firebase provides you with a very helpful interface in front of the [Google
Cloud Platform](), which is terribly complicated. It's used by [huge
companies](https://firebase.google.com/#trusted-by-the-largest-apps-and-games),
but it has a free plan as well, so it's used for hobby projects. You can easily
host files (which is useful for this mission) using their web hosting, but you
can also host a database, authenticate users, and more.

  4. Amazon Web Services, Google Cloud Platform, and Microsoft Azure

These three services are basically places where you can rent a little bit a of
computing power from the massive server farms at Amazon, Google, and Microsoft.

Each one has different services they provide, including computing,
databases, graphics processing units (for machine learning), or even just
virtual machines!

This is the perfect place to go if you're looking for 100% flexibility. You can
configure these machines in whatever crazy way you like. The problem is that you
can configure them in any way you like! It's a substantial amount of work that
could be spent elsewhere.

Unless you are working on a project which is cutting-edge and needs loads of
customizing, you are probably better off just using one of the other options,
where you don't have to worry about the server, instead you just worry about the
code.

## A few things to note

  * GitHub pages is used _all the time_. It's free, you can edit it easily, you
  get a nice domain, amazing.

  * Each of these solutions has a benefit and a downside. You should try all of
  them at least once, and then choose your favourite.

  * Don't worry too much about the speed. All of them are speedy quick and with
  [caching](https://www.cloudflare.com/learning/cdn/what-is-caching/) they will
  perform much better than you expect.

