.PHONY: help build push deploy logs restart clean health

# Colors
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

# Variables
DOCKER_IMAGE := maksebdev3/teif:latest
VPS_IP ?= your-vps-ip
VPS_USER ?= root
APP_DIR := /opt/teif

help: ## Show this help message
	@echo "$(GREEN)TEIF Deployment Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(GREEN)Environment Variables:$(NC)"
	@echo "  VPS_IP     Current: $(VPS_IP)"
	@echo "  VPS_USER   Current: $(VPS_USER)"
	@echo "  APP_DIR    Current: $(APP_DIR)"

# ============================================
# Local Development
# ============================================

install: ## Install dependencies
	pnpm install

dev: ## Start backend in development mode
	cd packages/backend && pnpm dev

build-local: ## Build Docker image locally
	docker build -t $(DOCKER_IMAGE) .

test-image: build-local ## Test Docker image locally
	docker run -p 3000:3000 -e DATABASE_URL="postgresql://postgres:password@localhost:5432/teif_dev" $(DOCKER_IMAGE)

# ============================================
# Docker Hub
# ============================================

push: build-local ## Build and push image to Docker Hub
	docker push $(DOCKER_IMAGE)

pull: ## Pull latest image from Docker Hub
	docker pull $(DOCKER_IMAGE)

# ============================================
# VPS Commands
# ============================================

deploy-vps: ## Deploy to VPS (requires VPS_IP set)
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 deploy-vps)$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)📦 Deploying to $(VPS_IP)...$(NC)"
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker pull $(DOCKER_IMAGE) && docker-compose up -d"
	@echo "$(GREEN)✅ Deployment complete!$(NC)"

setup-vps: ## Setup fresh VPS with auto-script
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 setup-vps)$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)🚀 Setting up VPS $(VPS_IP)...$(NC)"
	ssh $(VPS_USER)@$(VPS_IP) "curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/TEIF/main/deploy.sh | bash"

# ============================================
# Monitoring & Logs
# ============================================

logs: ## View backend logs (VPS)
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 logs)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose logs -f backend"

logs-db: ## View database logs (VPS)
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 logs-db)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose logs -f postgres"

logs-all: ## View all logs (VPS)
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 logs-all)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose logs -f"

# ============================================
# Service Management
# ============================================

restart-vps: ## Restart services on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 restart-vps)$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)⏸️  Restarting services...$(NC)"
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose restart"
	@echo "$(GREEN)✅ Services restarted$(NC)"

stop-vps: ## Stop services on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 stop-vps)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose down"

start-vps: ## Start services on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 start-vps)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose up -d"

status-vps: ## Check service status on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 status-vps)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose ps"

health-vps: ## Check health endpoint on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 health-vps)$(NC)"; \
		exit 1; \
	fi
	curl -s http://$(VPS_IP):3000/api/health | jq . || echo "$(RED)Health check failed$(NC)"

# ============================================
# Database Management
# ============================================

backup-vps: ## Create database backup on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 backup-vps)$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)💾 Creating database backup...$(NC)"
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && ./backup.sh"

db-shell: ## Access database shell on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 db-shell)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "cd $(APP_DIR) && docker-compose exec postgres psql -U postgres -d teif_prod"

# ============================================
# System Management
# ============================================

stats-vps: ## Show Docker resource usage on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 stats-vps)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "docker stats"

disk-vps: ## Check disk usage on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 disk-vps)$(NC)"; \
		exit 1; \
	fi
	ssh $(VPS_USER)@$(VPS_IP) "df -h"

clean-vps: ## Clean up old Docker images/volumes on VPS
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(RED)❌ Error: Set VPS_IP (e.g., make VPS_IP=1.2.3.4 clean-vps)$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)🧹 Cleaning up Docker...$(NC)"
	ssh $(VPS_USER)@$(VPS_IP) "docker image prune -a -f && docker volume prune -f"
	@echo "$(GREEN)✅ Cleanup complete$(NC)"

# ============================================
# Docker Compose Local
# ============================================

up: ## Start services locally with docker-compose
	docker-compose -f docker-compose.dev.yml up

down: ## Stop services locally
	docker-compose -f docker-compose.dev.yml down

ps: ## Show running containers locally
	docker-compose -f docker-compose.dev.yml ps

shell: ## SSH into backend container locally
	docker-compose -f docker-compose.dev.yml exec backend sh

# ============================================
# Utilities
# ============================================

version: ## Show version info
	@echo "$(GREEN)TEIF Deployment Manager$(NC)"
	@echo "Docker: $$(docker --version)"
	@echo "Docker Compose: $$(docker-compose --version)"
	@echo "Node: $$(node --version)"
	@echo "pnpm: $$(pnpm --version)"

generate-secrets: ## Generate random secrets for .env
	@echo "$(GREEN)Generated Secrets:$(NC)"
	@echo "  JWT_SECRET: $$(openssl rand -base64 32)"
	@echo "  JWT_REFRESH_SECRET: $$(openssl rand -base64 32)"
	@echo "  POSTGRES_PASSWORD: $$(openssl rand -base64 32)"
	@echo "  SIGNATURE_ENCRYPTION_KEY: $$(openssl rand -hex 64)"

# ============================================
# CI/CD Help
# ============================================

ci-test: ## Run tests for CI/CD
	pnpm run test

ci-build: ## Build for CI/CD
	docker build -t $(DOCKER_IMAGE) .

ci-push: ci-build ## Build and push (simulates CI/CD)
	docker push $(DOCKER_IMAGE)

# ============================================
# Quick Deployment Flow
# ============================================

deploy-complete: ## Complete deployment flow (build, push, deploy)
	@echo "$(GREEN)🚀 Complete Deployment Flow$(NC)"
	@echo ""
	@echo "Step 1: Building image..."
	$(MAKE) build-local
	@echo ""
	@echo "Step 2: Pushing to Docker Hub..."
	$(MAKE) push
	@echo ""
	@echo "Step 3: Deploying to VPS (set VPS_IP first)..."
	@if [ "$(VPS_IP)" = "your-vps-ip" ]; then \
		echo "$(YELLOW)⏭️  Skipped: Set VPS_IP to deploy (e.g., make VPS_IP=1.2.3.4 deploy-complete)$(NC)"; \
	else \
		$(MAKE) deploy-vps; \
	fi
	@echo ""
	@echo "$(GREEN)✅ Deployment flow complete!$(NC)"

.PHONY: help install dev build-local test-image push pull deploy-vps setup-vps \
        logs logs-db logs-all restart-vps stop-vps start-vps status-vps health-vps \
        backup-vps db-shell stats-vps disk-vps clean-vps up down ps shell \
        version generate-secrets ci-test ci-build ci-push deploy-complete
