-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 juin 2026 à 10:27
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `portfolio_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `contain`
--

CREATE TABLE `contain` (
  `projects_id` int(11) NOT NULL,
  `stacks_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contain`
--

INSERT INTO `contain` (`projects_id`, `stacks_id`) VALUES
(1, 9),
(1, 10),
(1, 11),
(1, 12);

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `projects_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `image_url`, `projects_id`) VALUES
(4, 'https://i.postimg.cc/V6jrHG5N/Group-75.png', 1),
(5, 'https://i.postimg.cc/xdn5bBXG/image-1.png', 1),
(6, 'https://i.postimg.cc/zvsSDQm5/image-2.png', 1);

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `github_url` varchar(500) DEFAULT NULL,
  `demo_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `github_url`, `demo_url`, `created_at`, `updated_at`, `users_id`) VALUES
(1, 'MarsAI', 'MarsAI est un projet réaliser en groupe dans le cadre d\'un projet professionnel en formation DWWM. L\'idée était de développer une application web pour un futur festival de courts métrages en IA ou hybride. Cette application a pour but de promotionner le festival et permettre au participants de proposer leur créations qui seront par la suite étudiées, validées (ou non) et notées par des administrateurs et un jury, c\'est pour cela qu\'il a fallut créer un panel admin et jury pour rendre ces fonctionnalités disponibles.', 'https://github.com/Nacer-atoui/marsai_nansy_front', 'https://www.figma.com/site/U4f8BYF49sMLpiQh4m9Si7/MarsAI--copie-?node-id=0-3&t=hsa3ybHXlWikwCJi-0', '2026-06-04 14:39:01', '2026-06-04 14:39:01', 1);

-- --------------------------------------------------------

--
-- Structure de la table `stacks`
--

CREATE TABLE `stacks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `logo_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `stacks`
--

INSERT INTO `stacks` (`id`, `name`, `type`, `logo_url`) VALUES
(1, 'React.JS', 'Frontend', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png'),
(2, 'Express.JS', 'Backend', 'https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png'),
(3, 'MySql', 'Database', 'https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png'),
(4, 'Figma', 'Design', NULL),
(5, 'React.JS', 'Frontend', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png'),
(6, 'Express.JS', 'Backend', 'https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png'),
(7, 'MySql', 'Database', 'https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png'),
(8, 'Figma', 'Design', NULL),
(9, 'React.JS', 'Frontend', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png'),
(10, 'Express.JS', 'Backend', 'https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png'),
(11, 'MySql', 'Database', 'https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png'),
(12, 'Figma', 'Design', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@portfolio.fr', '$2a$12$UrefQGWo.ReAntam0nopUOI6BBy.J1eyZWjTyHzgoPUaC/CrUQFJG', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contain`
--
ALTER TABLE `contain`
  ADD PRIMARY KEY (`projects_id`,`stacks_id`),
  ADD KEY `idx_contain_project_id` (`projects_id`),
  ADD KEY `idx_contain_stack_id` (`stacks_id`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_images_projects_id` (`projects_id`);

--
-- Index pour la table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_project_users_id` (`users_id`);

--
-- Index pour la table `stacks`
--
ALTER TABLE `stacks`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `stacks`
--
ALTER TABLE `stacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contain`
--
ALTER TABLE `contain`
  ADD CONSTRAINT `fk_contain_projects_projects_id` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_contain_stacks_stacks_id` FOREIGN KEY (`stacks_id`) REFERENCES `stacks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_images_projects_projects_id` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`);

--
-- Contraintes pour la table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_project_users_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
