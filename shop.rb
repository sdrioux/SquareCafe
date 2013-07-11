require 'bundler/setup'

Bundler.require

get '/' do
  erb :index
end

get '/taxes' do
  # how many drinks * 100 cents
  Array(params[:drink]).length * 100
end

post '/shop' do

params["drink"]
  resp = "Your order of "
  if params["drink"].length <= 2
    resp << params["drink"].first
  else
    params["drink"].each {|d|
      resp << d + ", " if d != "Please select a drink"
      if resp[-2]==","
        resp = resp[0..-3]
      end
    }
  end
  return resp
  # resp.reverse.sub!(/,/,"dna ").reverse!

  return resp

# # removes last comma, and replaces it with " and "


#   resp << " is on it's way!"


end

post '/signup' do

  resp = "Received email:  "
  resp << params["email"]
  puts "\n" * 3
  puts resp
  puts "\n" * 3

end
