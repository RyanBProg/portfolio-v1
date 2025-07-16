---
layout: ../../layouts/BlogPostLayout.astro
title: "Git, so you don’t get got (the git quickstart)"
pubDate: "15-07-2025"
description: "A git reference for the forgetful (you)."
author: "Ryan Bowler"
imageUrl: "../../assets/images/blog-posts/git-logo-480.png"
imageAlt: "Git logo"
tags: ["git", "coding", "guide"]
---

# Git, so you don’t get got (git quickstart)

_By Ryan Bowler - 15/07/2025_

## Introduction

This blog post is not for beginners, nor is it a step-by-step guide on using git. it's to act soley as a reference for the forgetful (you).

## Basic Commands

- `Git init` – initialise the current folder as a git repo to start tracking changes.
- `Git status` – shows the current git status meaning what has changed since the last commit.
- `Git add <flag>` – add an untracked file to the staging area. Some common flags include:
  - `.` – adds all
  - `index.html` – adds the file named index.html
- `Git commit -m "this is the title" -m "This is the description"` – commits staged files, should include the what and the why for committing these changes.
- `Git push origin <branch name>` – push my latest commit(s) to the remote repository.
- `Git clone <repo url>` – Clone a remote git repo to your local machine.
- `Git branch` – view the branches (type “q” to quit vim)
- `Git branch -d <branch name>` – Delete a git branch (locally)
- `Git push origin -d <branch name>` – Delete a git branch (remote)
- `Git fetch --prune` – cleans up local references to deleted remote branches (run after deleting branch)
- `Git checkout <branch name>` – switch between branches
- `Git checkout -b <branch name>` – to create a new branch and then check it out at the same time
- `Git diff <branch name>` – Shows the differences between the current working branch and the given branch `<branch name>`
- `Git merge <branch name>` – Merge the given branch `<branch name>` into the current branch
- `Git log` – show the history of all the commits
- `Git reset` – remove all files from the staging area
- `Git pull` – grabs the latest changes from the remote branch and merges them into your local branch. Use this often or risk becoming the person who breaks the build because your branch is 3 weeks out of date.
- `Git stash` – temporarily shelves your changes so you can switch branches without committing messy half-finished code.
- `Git restore <filename>` – brings a file back to its last committed state. Good for "I broke this file, how do I just get it back to how it was?" moments.

---

## Naming things (Branch/Commit/Pull Request)

- Reference the ticket number or feature number e.g. `feature-mobile navigation`, `issue-1234`
- Describe the what and the why of the changes
- For pull requests you should be a lot more descriptive in terms of what has changed.

---

## .gitIgnore

This is where to add all of the files you don’t want git to track. This will be things like `node_modules` and `.env` files for obvious reasons.

---

## Merging Branches to Main

There are 2 ways you can do this:

1. Pull (clone) the most recent version of the main branch to your local machine, run `git merge` locally to merge the feature branch to main, then push the updated main branch up to the repo.
2. Push the branch up to the remote repo and create a pull request to merge the branch to main in the remote repo.

### Merge Locally

- First, pull the latest version of the main branch to your local machine to make sure it's up to date.
- Then, switch to the main branch locally and run `git merge <feature-branch>` to merge your changes.
- Finally, push the updated main branch back to the remote repository.

### Merge via Pull Request (recommended on GitHub)

- Push your feature branch to the remote repository (e.g., GitHub).
- Open a Pull Request (PR) to propose merging your feature branch into main.
- Review the changes, resolve any conflicts, and merge the PR using GitHub’s interface.

Even though both of these methods achieve the same result, merging via a pull request tends to be the more popular way of merging branches.

---

## Update Your Branch

Imagine this: you’re in a team of devs, each working on your own branch, building out new features. You get assigned a feature to build, so you branch off main and off you go, smashing keys to get this “2-week” task done.

Let’s be realistic — 4 weeks have passed, and it’s very likely that main has been updated several times by your teammates. Now, when it’s time to merge your feature branch back into main, your branch might be seriously out of date — which means your chances of hitting merge conflicts just went way up.

**How do you avoid this, you ask?**  
While it’s impossible to avoid merge conflicts entirely, having the discipline to routinely check for updates on main and merge them into your feature branch will go a long way in reducing the chances.  
The more often you do it, the smoother your final merge will be.

---

## Fixing Merge Conflict

Seriously, just handle it in your code editor. Figure out which code should stay, and which should go. Most importantly: talk to the person who made the last commit on the branch you’re merging into. They’ll know way more than you do about the why and how behind the changes — context saves lives.

---

## You Messed Up, What Now?

This topic is huge and should really have its own dedicated post (which I haven’t written). Honestly, the git documentation does such a great job of explaining this anyway that just going to link it below. This will help you out so much more than me regurgitate what they have already explained well.

📖 https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things

---

## Forking vs Cloning

Cloning is grabbing a copy of a repo so you can mess around with it locally. It’s what you do when you’re part of the team and pushing changes back is expected.

Forking, on the other hand, is more like, “I don’t have write access, but I want to play anyway.” It creates your own copy of the repo under your GitHub account — perfect for contributing to open source.

**TL;DR:**  
Clone if it’s your project (or your company’s), fork if it’s someone else’s.

---

## If you get stuck…

If you get stuck or find my explanations not to your liking, as I’m sure you’ve heard countless times before… just read the docs, they go into much more detail than I have.

The specific chapters to look at would be:

- Git Basics 2.1: https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository
- Git Branching 3.2: https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
