## DESCRIPCIÓN

Generic Helm template to create a Deployment of an Ontimize Application (service).

To deploy in a K8s Cluster ArgoCD is used. (development environment https://argocd.dev.imatia.cloud). Access is granted using Azure AD credentials (Imatia domain).

Values can be customized in values.yaml, but after the application sources are generated a standard configuration ready to run is provided.

See values.yaml to get detailed information of parameters.

Ingress and TLS are enabled by default. Value in host is provided as HOST environment variable to the pod.

Also prometheus annotations, probe paths, kafka, keycloak and other parameters are configured by default, and setup with required configuration for K8s Imatia development cluster. Configuration is provided as environment variables to the pod (and so available to the Ontimize application as defined in application-xx.yaml files).

Resources (CPU, Memory can be customized as needed).

Also using configmap section in values.yaml it is easy to provide environment values to the pod, adapting deployment.yaml.

If in the configmap.data section a key "environment-profile" exists, its value will be injected as ENVIRONMENT_PROFILE variable. This can be used to differentiate between staging and production environments easily.
