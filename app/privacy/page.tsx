import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <Badge className="mb-4">Legal</Badge>
                <h1 className="font-comfortaa text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
                <p className="mt-4 text-lg text-muted-foreground">Last updated: September 26, 2025</p>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Information We Collect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Personal Information</h4>
                      <p className="text-sm text-muted-foreground">
                        We collect information you provide directly, including name, email, age, location, preferences,
                        and profile information necessary for matching and safety verification.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Usage Data</h4>
                      <p className="text-sm text-muted-foreground">
                        We collect information about how you use our service, including interactions, venue check-ins,
                        and app usage patterns to improve matching algorithms.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Location Data</h4>
                      <p className="text-sm text-muted-foreground">
                        With your permission, we collect location data to suggest nearby venues and enable safety
                        features like check-ins and emergency services.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How We Use Your Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Provide and improve our matching services</li>
                      <li>• Ensure user safety and platform security</li>
                      <li>• Communicate with you about your account and our services</li>
                      <li>• Analyze usage patterns to enhance user experience</li>
                      <li>• Comply with legal obligations and prevent fraud</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Information Sharing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      We do not sell your personal information. We may share information only in these circumstances:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• With your explicit consent</li>
                      <li>• With service providers who help operate our platform</li>
                      <li>• When required by law or to protect safety</li>
                      <li>• In connection with a business transaction</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Rights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">You have the right to:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Access and update your personal information</li>
                      <li>• Delete your account and associated data</li>
                      <li>• Opt out of certain communications</li>
                      <li>• Request a copy of your data</li>
                      <li>• Withdraw consent for data processing</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      For privacy-related questions or requests, contact us at:
                      <br />
                      Email: privacy@waypoint.app
                      <br />
                      Address: [Company Address]
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
