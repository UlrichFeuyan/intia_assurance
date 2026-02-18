# intia_assurance

Application web fullstack pour le compte de Inita Assurance permettant la gestion des clients et des assurances.

## Architecture

- **Backend** : Django 5 + Django REST Framework avec JWT
- **Frontend** : React 19 + TypeScript + Vite
- **Base de données** : MySQL
- **Authentification** : JWT (JSON Web Tokens)

## Prérequis

- Python 3.10+
- Node.js 18+
- MySQL 8.0+ (pour la production)
- Git

## Installation et Déploiement

### 1. Installation en Développement

#### 1.1 Cloner le repository

```bash
git clone <repository-url>
cd intia_assurance
```

#### 1.2 Configuration du Backend

##### 1.2.1 Créer un environnement virtuel Python

```bash
cd backend
python -m venv venv

# Sous Windows
venv\Scripts\activate

# Sous Linux/Mac
source venv/bin/activate
```

##### 1.2.2 Installer les dépendances Python

```bash
pip install -r requirements.txt
```

##### 1.2.3 Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `backend/` :

```env
# Django Settings
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=your-secret-key-here-change-in-production
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

# Database (Development - SQLite par défaut)
# Pour MySQL, décommenter et configurer :
# DB_ENGINE=django.db.backends.mysql
# DB_NAME=intia_assurance_dev
# DB_USER=root
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=3306

# JWT Settings
JWT_SECRET_KEY=your-jwt-secret-key-here
```

##### 1.2.4 Appliquer les migrations

```bash
python manage.py migrate
```

##### 1.2.5 Charger les données d'exemple (optionnel)

```bash
python manage.py seed_sample_data
```

##### 1.2.6 Créer un superutilisateur (admin)

```bash
python manage.py createsuperuser
```

##### 1.2.7 Démarrer le serveur de développement

```bash
python manage.py runserver
```

Le serveur Django sera accessible sur `http://localhost:8000`
L'interface admin sur `http://localhost:8000/admin`

#### 1.3 Configuration du Frontend

##### 1.3.1 Installer les dépendances Node.js

```bash
cd ../frontend
npm install
```

##### 1.3.2 Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `frontend/` :

```env
VITE_API_URL=http://localhost:8000/api
```

##### 1.3.3 Démarrer le serveur de développement

```bash
npm run dev
```

Le serveur Vite sera accessible sur `http://localhost:5173`

### 2. Déploiement en Production

#### 2.1 Configuration du Backend

##### 2.1.1 Préparer le serveur

```bash
# Mettre à jour les packages système
sudo apt update && sudo apt upgrade -y

# Installer les dépendances système
sudo apt install -y python3.10 python3.10-venv mysql-server nginx supervisor
```

##### 2.1.2 Cloner et configurer l'application

```bash
cd /var/www
sudo git clone <repository-url> intia_assurance
cd intia_assurance/backend

# Créer l'environnement virtuel
python3.10 -m venv venv
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
pip install gunicorn
```

##### 2.1.3 Configuration des variables d'environnement

Créer `/var/www/intia_assurance/backend/.env` :

```env
# Django Production Settings
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=generate-a-strong-random-key-here
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,your-ip-address

# Database MySQL
DB_ENGINE=django.db.backends.mysql
DB_NAME=intia_assurance_prod
DB_USER=django_user
DB_PASSWORD=strong_password_here
DB_HOST=localhost
DB_PORT=3306

# JWT Settings
JWT_SECRET_KEY=generate-another-strong-random-key-here

# Storage (optionnel - pour S3 ou autre)
USE_S3=False
```

##### 2.1.4 Préparer la base de données MySQL

```bash
sudo mysql -u root -p

CREATE DATABASE intia_assurance_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON intia_assurance_prod.* TO 'django_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

##### 2.1.5 Appliquer les migrations

```bash
cd /var/www/intia_assurance/backend
source venv/bin/activate
python manage.py migrate
```

##### 2.1.6 Collecter les fichiers statiques

```bash
python manage.py collectstatic --noinput
```

##### 2.1.7 Configurer Supervisor pour Gunicorn

Créer `/etc/supervisor/conf.d/intia_assurance.conf` :

```ini
[program:intia_assurance]
directory=/var/www/intia_assurance/backend
command=/var/www/intia_assurance/backend/venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 4
user=www-data
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/intia_assurance.log
```

Puis démarrer :

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start intia_assurance
```

##### 2.1.8 Configurer Nginx

Créer `/etc/nginx/sites-available/intia_assurance` :

```nginx
upstream intia_assurance_backend {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirection HTTP vers HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # Certificats SSL (avec Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    client_max_body_size 10M;

    # Backend API
    location /api/ {
        proxy_pass http://intia_assurance_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin Django
    location /admin/ {
        proxy_pass http://intia_assurance_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Fichiers statiques
    location /static/ {
        alias /var/www/intia_assurance/backend/staticfiles/;
        expires 30d;
    }

    # Frontend (SPA React)
    location / {
        root /var/www/intia_assurance/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires -1;
        add_header Cache-Control "public, no-cache, must-revalidate";
    }
}
```

Activer la configuration :

```bash
sudo ln -s /etc/nginx/sites-available/intia_assurance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

##### 2.1.9 Configurer SSL avec Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
```

#### 2.2 Configuration du Frontend

##### 2.2.1 Build de production

```bash
cd /var/www/intia_assurance/frontend
npm install
npm run build
```

##### 2.2.2 Configurer les variables d'environnement

Créer `.env.production` :

```env
VITE_API_URL=https://yourdomain.com/api
```

### 3. Maintenance et Monitoring

#### Logs

```bash
# Logs Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Logs Gunicorn/Django
sudo tail -f /var/log/intia_assurance.log

# Logs Supervisor
sudo tail -f /var/log/supervisor/intia_assurance-stdout---supervisor-*.log
```

#### Mise à jour de l'application

```bash
cd /var/www/intia_assurance

# Mettre à jour le code
git pull origin main
source backend/venv/bin/activate

# Appliquer les migrations
cd backend
python manage.py migrate

# Collecter les statiques
python manage.py collectstatic --noinput

# Rebuild frontend
cd ../frontend
npm install
npm run build

# Redémarrer les services
sudo supervisorctl restart intia_assurance
sudo systemctl restart nginx
```

#### Sauvegarde de la base de données

```bash
# Créer une sauvegarde
mysqldump -u django_user -p intia_assurance_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurer une sauvegarde
mysql -u django_user -p intia_assurance_prod < backup_*.sql
```

### 4. Variables d'environnement essentielles

| Variable | Dev | Prod | Description |
|----------|-----|------|-------------|
| `DJANGO_DEBUG` | `True` | `False` | Mode debug |
| `DJANGO_SECRET_KEY` | Simple | Fort & Aléatoire | Clé secrète Django |
| `DJANGO_ALLOWED_HOSTS` | `localhost,127.0.0.1` | `yourdomain.com` | Hosts autorisés |
| `DB_ENGINE` | `sqlite3` | `mysql` | Base de données |

### 5. Règles de développement

Voir [PROJECT_RULES.md](backend/PROJECT_RULES.md) pour les bonnes pratiques.

- Utiliser Django 5 avec les meilleures pratiques
- Architecture modulaire
- Pas de logique métier dans les vues
- Utiliser ModelViewSets
- Utiliser les serializers pour la validation
- Code simple et lisible

## Support et Documentation

- [Frontend Guide](frontend/README.md)
- [Auth Guide](frontend/AUTH_GUIDE.md)
- [Axios Guide](frontend/AXIOS_GUIDE.md)
