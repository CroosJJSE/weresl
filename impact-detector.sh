#!/bin/bash

# WERESL System Change Impact Detector
# This script helps identify the impact of changes across all webapps

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project directories
PROJECTS=(
    "databaseForms/loan-admin-app"
    "databaseForms/loan-init-app"
    "databaseForms/rfgif-return-app"
    "databaseWebApp"
    "dev-data-dashboard"
    "drive-upload-demo"
)

echo -e "${BLUE}🔍 WERESL System Change Impact Detector${NC}"
echo "================================================"

# Function to search for usage across all projects
search_usage() {
    local search_term="$1"
    local description="$2"
    
    echo -e "\n${YELLOW}🔍 Searching for: $description${NC}"
    echo "Search term: $search_term"
    echo "----------------------------------------"
    
    local found=false
    for project in "${PROJECTS[@]}"; do
        if [ -d "$project" ]; then
            local results=$(grep -r "$search_term" "$project/src/" 2>/dev/null || true)
            if [ -n "$results" ]; then
                echo -e "${RED}📁 $project:${NC}"
                echo "$results" | sed 's/^/  /'
                found=true
            fi
        fi
    done
    
    if [ "$found" = false ]; then
        echo -e "${GREEN}✅ No usage found${NC}"
    fi
}

# Function to check for enum consistency
check_enum_consistency() {
    local enum_file="$1"
    local enum_name="$2"
    
    echo -e "\n${YELLOW}🔍 Checking enum consistency: $enum_name${NC}"
    echo "File: $enum_file"
    echo "----------------------------------------"
    
    local first_file=""
    local first_content=""
    
    for project in "${PROJECTS[@]}"; do
        local file_path="$project/src/$enum_file"
        if [ -f "$file_path" ]; then
            if [ -z "$first_file" ]; then
                first_file="$file_path"
                first_content=$(cat "$file_path")
                echo -e "${GREEN}📁 Reference: $first_file${NC}"
            else
                local current_content=$(cat "$file_path")
                if [ "$first_content" != "$current_content" ]; then
                    echo -e "${RED}❌ INCONSISTENT: $file_path${NC}"
                    echo "  Diff detected with reference file"
                else
                    echo -e "${GREEN}✅ Consistent: $file_path${NC}"
                fi
            fi
        fi
    done
}

# Function to check build status
check_build_status() {
    echo -e "\n${YELLOW}🔍 Checking build status for all projects${NC}"
    echo "----------------------------------------"
    
    for project in "${PROJECTS[@]}"; do
        if [ -d "$project" ]; then
            echo -e "${BLUE}📁 Building $project...${NC}"
            if cd "$project" && npm run build > /dev/null 2>&1; then
                echo -e "${GREEN}✅ $project: Build successful${NC}"
            else
                echo -e "${RED}❌ $project: Build failed${NC}"
            fi
            cd - > /dev/null
        fi
    done
}

# Function to analyze dependencies
analyze_dependencies() {
    local function_name="$1"
    
    echo -e "\n${YELLOW}🔍 Analyzing dependencies for: $function_name${NC}"
    echo "----------------------------------------"
    
    # Search for function definition
    echo -e "${BLUE}📋 Function definition:${NC}"
    for project in "${PROJECTS[@]}"; do
        if [ -d "$project" ]; then
            local def=$(grep -r "export.*$function_name" "$project/src/" 2>/dev/null || true)
            if [ -n "$def" ]; then
                echo -e "${GREEN}📁 $project:${NC}"
                echo "$def" | sed 's/^/  /'
            fi
        fi
    done
    
    # Search for function usage
    echo -e "\n${BLUE}📋 Function usage:${NC}"
    search_usage "$function_name" "Function usage"
    
    # Search for imports
    echo -e "\n${BLUE}📋 Import statements:${NC}"
    search_usage "import.*$function_name" "Import statements"
}

# Function to check critical files
check_critical_files() {
    echo -e "\n${YELLOW}🔍 Checking critical shared files${NC}"
    echo "----------------------------------------"
    
    local critical_files=(
        "enums/db.js"
        "enums/districts.js"
        "enums/loans.js"
        "utils/dbUtils.js"
        "utils/regIdUtils.js"
        "utils/driveUtils.js"
    )
    
    for file in "${critical_files[@]}"; do
        echo -e "\n${BLUE}📄 Checking $file${NC}"
        local found_in=()
        
        for project in "${PROJECTS[@]}"; do
            if [ -f "$project/src/$file" ]; then
                found_in+=("$project")
            fi
        done
        
        if [ ${#found_in[@]} -gt 0 ]; then
            echo -e "${GREEN}✅ Found in: ${found_in[*]}${NC}"
        else
            echo -e "${RED}❌ Not found in any project${NC}"
        fi
    done
}

# Function to check Firebase configuration
check_firebase_config() {
    echo -e "\n${YELLOW}🔍 Checking Firebase configuration${NC}"
    echo "----------------------------------------"
    
    for project in "${PROJECTS[@]}"; do
        if [ -d "$project" ]; then
            local firebase_config="$project/firebase-config.js"
            local firebase_json="$project/firebase.json"
            
            echo -e "\n${BLUE}📁 $project:${NC}"
            
            if [ -f "$firebase_config" ]; then
                echo -e "${GREEN}✅ firebase-config.js exists${NC}"
            else
                echo -e "${RED}❌ firebase-config.js missing${NC}"
            fi
            
            if [ -f "$firebase_json" ]; then
                echo -e "${GREEN}✅ firebase.json exists${NC}"
                # Check for site configuration
                if grep -q '"site"' "$firebase_json"; then
                    local site=$(grep '"site"' "$firebase_json" | sed 's/.*"site": *"\([^"]*\)".*/\1/')
                    echo -e "${BLUE}  Site: $site${NC}"
                else
                    echo -e "${YELLOW}⚠️  No site configuration${NC}"
                fi
            else
                echo -e "${RED}❌ firebase.json missing${NC}"
            fi
        fi
    done
}

# Function to generate impact report
generate_impact_report() {
    local change_description="$1"
    
    echo -e "\n${YELLOW}📊 Generating Impact Report${NC}"
    echo "================================================"
    echo -e "${BLUE}Change Description: $change_description${NC}"
    echo -e "${BLUE}Timestamp: $(date)${NC}"
    echo ""
    
    # Check critical files
    check_critical_files
    
    # Check enum consistency
    check_enum_consistency "enums/db.js" "Database Enums"
    check_enum_consistency "enums/districts.js" "District Enums"
    
    # Check Firebase configuration
    check_firebase_config
    
    # Check build status
    check_build_status
    
    echo -e "\n${GREEN}✅ Impact analysis complete${NC}"
}

# Main menu
show_menu() {
    echo -e "\n${BLUE}Select an option:${NC}"
    echo "1. Search for function/constant usage"
    echo "2. Check enum consistency"
    echo "3. Analyze function dependencies"
    echo "4. Check build status"
    echo "5. Check critical files"
    echo "6. Check Firebase configuration"
    echo "7. Generate full impact report"
    echo "8. Exit"
    echo ""
    read -p "Enter your choice (1-8): " choice
}

# Main execution
main() {
    if [ $# -eq 0 ]; then
        # Interactive mode
        while true; do
            show_menu
            case $choice in
                1)
                    read -p "Enter search term: " search_term
                    read -p "Enter description: " description
                    search_usage "$search_term" "$description"
                    ;;
                2)
                    check_enum_consistency "enums/db.js" "Database Enums"
                    ;;
                3)
                    read -p "Enter function name: " function_name
                    analyze_dependencies "$function_name"
                    ;;
                4)
                    check_build_status
                    ;;
                5)
                    check_critical_files
                    ;;
                6)
                    check_firebase_config
                    ;;
                7)
                    read -p "Enter change description: " change_description
                    generate_impact_report "$change_description"
                    ;;
                8)
                    echo -e "${GREEN}Goodbye!${NC}"
                    exit 0
                    ;;
                *)
                    echo -e "${RED}Invalid option. Please try again.${NC}"
                    ;;
            esac
        done
    else
        # Command line mode
        case "$1" in
            "search")
                search_usage "$2" "$3"
                ;;
            "enum")
                check_enum_consistency "enums/db.js" "Database Enums"
                ;;
            "deps")
                analyze_dependencies "$2"
                ;;
            "build")
                check_build_status
                ;;
            "report")
                generate_impact_report "$2"
                ;;
            *)
                echo "Usage: $0 [search|enum|deps|build|report] [args...]"
                echo "  search <term> <description> - Search for usage"
                echo "  enum - Check enum consistency"
                echo "  deps <function> - Analyze dependencies"
                echo "  build - Check build status"
                echo "  report <description> - Generate impact report"
                ;;
        esac
    fi
}

# Run main function
main "$@"
